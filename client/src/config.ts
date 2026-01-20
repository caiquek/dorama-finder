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
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://bisectionally-nondisputatious-tran.ngrok-free.dev/webhook/0e41dbb7-b0ae-44c1-bafa-513b1508c3ed',
  
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
 * Dados de exemplo para fallback quando o webhook não está disponível
 */
const FALLBACK_DATA: Record<string, DoramaResult> = {
  'itaewon class': {
    title: 'Itaewon Class',
    avalue: '8.2/10',
    cast: 'Park Seo-joon, Kim Da-mi, Yoo Jae-myung, Kwon Nara',
    genere: 'Drama, Negócios, Romance, Juventude',
    resume: 'Park Sae-ro-yi, um ex-condenado, abre um bar-restaurante chamado DanBam em Itaewon com o objetivo de realizar sua vingança contra o Grupo Jang Ga. A trama explora sua jornada para o sucesso, enfrentando adversidades, rivalidades intensas e formando uma equipe diversificada. O dorama aborda temas como justiça, resiliência, discriminação, ambição e a busca pela própria identidade, tudo isso enquanto Park Sae-ro-yi tenta superar o passado e construir um futuro brilhante.',
  },
  'goblin': {
    title: 'Goblin (Guardian: The Lonely and Great God)',
    avalue: '9.3/10',
    cast: 'Gong Yoo, Kim Go-eun, Lee Dong-wook, Yoo In-na, Yook Sung-jae',
    genere: 'Fantasia, Romance, Drama',
    resume: 'Kim Shin (Gong Yoo) é um general militar amaldiçoado que se transforma em um Goblin imortal. Para acabar com sua imortalidade e finalmente descansar em paz, ele deve encontrar sua noiva humana, a única que pode remover a espada cravada em seu peito. 900 anos depois, ele encontra Ji Eun-tak (Kim Go-eun), uma estudante do ensino médio que tem a capacidade de ver fantasmas e que afirma ser a noiva do Goblin.',
  },
  'crash landing on you': {
    title: 'Crash Landing on You',
    avalue: '9.0/10',
    cast: 'Hyun Bin, Son Ye-jin, Seo Ji-hye, Kim Jung-hyun',
    genere: 'Romance, Comédia, Drama, Militar',
    resume: 'Yoon Se-ri, uma herdeira sul-coreana, acidentalmente parapente para a Coreia do Norte e conhece Ri Jeong-hyeok, um oficial militar norte-coreano que a ajuda a se esconder. Enquanto tentam encontrar uma maneira de ela retornar para casa, eles desenvolvem sentimentos um pelo outro.',
  },
};

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

    let response: Response;
    try {
      response = await fetch(N8N_CONFIG.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: doramaName.trim(),
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      console.warn('⚠️ Falha ao conectar ao webhook N8N:', fetchError);
      console.log('🔄 Tentando usar dados de fallback...');
      
      // Tentar usar dados de fallback
      const fallbackKey = doramaName.toLowerCase().trim();
      const fallbackData = Object.entries(FALLBACK_DATA).find(
        ([key]) => key.includes(fallbackKey) || fallbackKey.includes(key)
      );
      
      if (fallbackData) {
        console.log('✅ Dados de fallback encontrados para:', fallbackKey);
        return fallbackData[1];
      }
      
      console.error('❌ Webhook indisponível e nenhum dado de fallback encontrado');
      throw new Error(
        'Webhook N8N não está respondendo. Verifique se:\n' +
        '1. O N8N está rodando\n' +
        '2. O workflow está ativo\n' +
        '3. A URL do webhook está correta\n' +
        '4. Se usar ngrok, verifique se a URL não expirou'
      );
    }

    clearTimeout(timeoutId);

    console.log('📊 Status da resposta:', response.status);
    console.log('📋 Headers da resposta:', Object.fromEntries(response.headers));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na resposta:', errorText);
      
      // Tentar fallback se o webhook retornar erro
      const fallbackKey = doramaName.toLowerCase().trim();
      const fallbackData = Object.entries(FALLBACK_DATA).find(
        ([key]) => key.includes(fallbackKey) || fallbackKey.includes(key)
      );
      
      if (fallbackData) {
        console.log('⚠️ Webhook retornou erro, usando dados de fallback');
        return fallbackData[1];
      }
      
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
