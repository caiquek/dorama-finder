/**
 * Home - Página de busca de doramas
 * 
 * Design Philosophy: Minimalismo Moderno
 * - Espaço negativo generoso
 * - Tipografia grande como protagonista
 * - Laranja usado estrategicamente em CTAs
 * - Gelo em backgrounds secundários
 * - Foco total na caixa de busca
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { searchDorama, DoramaResult } from "@/config";
import DoramaResultPage from "./DoramaResult";
import { toast } from "sonner";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DoramaResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!searchQuery.trim()) {
      toast.error("Digite o nome de um dorama");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      console.log('🔍 Iniciando busca por:', searchQuery);
      const doramaResult = await searchDorama(searchQuery);
      console.log('✅ Resultado recebido:', doramaResult);
      setResult(doramaResult);
      setError(null);
      toast.success("Dorama encontrado!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar dorama";
      console.error('❌ Erro na busca:', errorMessage);
      toast.error(errorMessage);
      setResult(null);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setHasSearched(false);
    setSearchQuery("");
    setError(null);
  };

  // Se há resultado, mostrar página de resultado
  if (result) {
    return <DoramaResultPage result={result} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden relative">
      {/* Background decorativo com imagem gerada */}
      <div className="fixed top-0 left-0 -z-10 opacity-30 pointer-events-none">
        <img
          src="/images/hero-background.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Accent decorativo no canto inferior */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-15 pointer-events-none">
        <img
          src="/images/search-icon-accent.png"
          alt=""
          className="w-96 h-auto"
        />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-12">
          {/* Logo/Título */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Dorama
              <br />
              <span className="text-primary">Finder</span>
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Descubra informações sobre seus doramas favoritos
            </p>
          </div>

          {/* Formulário de busca */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              {/* Input com design minimalista */}
              <div className="relative flex items-center">
                <Input
                  type="text"
                  placeholder="Digite o nome do dorama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-6 py-4 text-lg bg-white border-2 border-border/40 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300 placeholder:text-muted-foreground/50"
                />
                <div className="absolute right-4 text-muted-foreground/40">
                  <Search className="w-5 h-5" />
                </div>
              </div>

              {/* Linha decorativa laranja abaixo do input */}
              <div className="absolute -bottom-3 left-0 h-1 w-12 bg-primary rounded-full transition-all duration-300" />
            </div>

            {/* Botão de busca */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-base font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">Erro na busca</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Mensagem de nenhum resultado */}
          {hasSearched && !result && !isLoading && !error && (
            <div className="text-center">
              <p className="text-muted-foreground">
                Nenhum resultado encontrado. Tente outro nome.
              </p>
            </div>
          )}

          {/* Dica de uso */}
          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground/60">
              Digite o nome de um dorama para começar
            </p>
          </div>
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="border-t border-border/20 py-6 px-4 text-center">
        <p className="text-xs text-muted-foreground/50">
          Dorama Finder © 2026 — Busca minimalista de doramas
        </p>
      </footer>
    </div>
  );
}
