/**
 * Configuração do webhook N8N para busca de doramas
 * 
 * Design Philosophy: Minimalismo Moderno
 * - Centraliza a configuração de integração externa
 * - Permite fácil atualização da URL do webhook
 * - Tipagem segura para requisições
 * - Sem dados mockados - apenas integração real com N8N
 */

export const N8N_CONFIG = {
  // URL do webhook N8N - IMPORTANTE: Use a URL pública do seu N8N
  // Se estiver rodando localmente, use ngrok: ngrok http 5678
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://bisectionally-nondisputatious-tran.ngrok-free.dev/webhook-test/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed',
  
  // Timeout para requisições (ms)
  timeout: 60000,
};

/**
 * Interface para resposta do N8N
 */
export interface DoramaResult {
  title: string;
  avalue: string;
  cast: string;
  genere: string;
  resume: string;
}

/**
 * Função para buscar dorama através do webhook N8N
 */
export async function searchDorama(doramaName: string): Promise<DoramaResult> {
  try {
    // Requisição ao webhook N8N
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), N8N_CONFIG.timeout);

    console.log('📡 Enviando requisição POST para:', N8N_CONFIG.webhookUrl);
    console.log('📦 Payload:', { query: doramaName.trim() });

    const response = await fetch(N8N_CONFIG.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: doramaName.trim(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('📊 Status da resposta:', response.status);
    console.log('📋 Headers da resposta:', Object.fromEntries(response.headers));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na resposta:', errorText);
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();
    console.log('📥 Resposta bruta do N8N:', JSON.stringify(data, null, 2));

    // Tratamento de diferentes formatos de resposta do N8N
    
    // Se a resposta tem um campo 'output', extrair
    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      console.log('📦 Resposta tem campo "output", extraindo primeiro item');
      data = data.output[0];
    }
    
    // Se a resposta é um array, pegar o primeiro item
    if (Array.isArray(data) && data.length > 0) {
      console.log('📦 Resposta é um array, extraindo primeiro item');
      data = data[0];
    }

    // Se a resposta tem um campo 'subject' (estrutura do N8N), extrair
    if (data.subject && typeof data.subject === 'object') {
      console.log('📦 Resposta tem campo "subject", extraindo');
      // Se subject é um array, pegar o primeiro item
      if (Array.isArray(data.subject)) {
        data = data.subject[0];
      } else {
        data = data.subject;
      }
    }

    // Se a resposta tem um campo 'body', extrair
    if (data.body && typeof data.body === 'object') {
      console.log('📦 Resposta tem campo "body", extraindo');
      data = data.body;
    }

    // Se a resposta tem um campo 'data', extrair
    if (data.data && typeof data.data === 'object') {
      console.log('📦 Resposta tem campo "data", extraindo');
      data = data.data;
    }

    console.log('🔍 Dados após processamento:', JSON.stringify(data, null, 2));

    // Validar que a resposta contém os campos esperados
    const requiredFields = ['title', 'avalue', 'cast', 'genere', 'resume'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.error('❌ Campos faltantes:', missingFields);
      console.error('❌ Dados recebidos:', data);
      throw new Error(`Resposta incompleta. Campos faltantes: ${missingFields.join(', ')}`);
    }

    console.log('✅ Resposta válida recebida');
    return data as DoramaResult;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('⏱️ Requisição expirou após', N8N_CONFIG.timeout, 'ms');
        throw new Error('Requisição expirou. Tente novamente.');
      }
      console.error('❌ Erro:', error.message);
      throw error;
    }
    console.error('❌ Erro desconhecido:', error);
    throw new Error('Erro desconhecido ao buscar dorama');
  }
}
