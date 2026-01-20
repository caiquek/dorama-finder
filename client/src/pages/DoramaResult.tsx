/**
 * DoramaResult - Página de exibição de resultado
 * 
 * Design Philosophy: Minimalismo Moderno
 * - Tipografia grande e respirada como protagonista
 * - Espaço negativo generoso ao redor do card
 * - Laranja usado estrategicamente em CTAs
 * - Gelo em backgrounds secundários
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRoute } from "wouter";
import { DoramaResult as DoramaResultType } from "@/config";

interface DoramaResultPageProps {
  result: DoramaResultType;
  onBack: () => void;
}

export default function DoramaResultPage({ result, onBack }: DoramaResultPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header com botão voltar */}
      <header className="border-b border-border/40 py-6 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 text-foreground hover:bg-secondary/50 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-3xl">
          {/* Card de resultado com design minimalista */}
          <div className="bg-white border border-border/40 rounded-lg p-8 md:p-12 space-y-8">
            {/* Linha decorativa laranja no topo */}
            <div className="h-1 w-16 bg-primary rounded-full" />

            {/* Título do dorama */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {result.title}
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                {result.avalue}
              </p>
            </div>

            {/* Divisor */}
            <div className="h-px bg-border/40" />

            {/* Gênero */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Gênero
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {result.genere}
              </p>
            </div>

            {/* Elenco */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Elenco
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {result.cast}
              </p>
            </div>

            {/* Sinopse */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Sinopse
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                {result.resume}
              </p>
            </div>

            {/* Divisor final */}
            <div className="h-px bg-border/40" />

            {/* Botão voltar */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={onBack}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-lg transition-all duration-300"
              >
                Buscar outro dorama
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Background accent - imagem decorativa */}
      <div className="fixed top-0 right-0 -z-10 opacity-20 pointer-events-none">
        <img
          src="/images/result-card-accent.png"
          alt=""
          className="w-64 h-auto"
        />
      </div>
    </div>
  );
}
