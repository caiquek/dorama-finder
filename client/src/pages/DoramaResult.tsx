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
import { ArrowLeft, Film, Users, BookOpen, Star } from "lucide-react";
import { useRoute } from "wouter";
import { DoramaResult as DoramaResultType } from "@/config";
import { motion } from "framer-motion";

interface DoramaResultPageProps {
  result: DoramaResultType;
  onBack: () => void;
}

export default function DoramaResultPage({ result, onBack }: DoramaResultPageProps) {
  // Design Philosophy: Minimalismo Moderno com Animações Suaves
  // - Animações criam fluidez sem sobrecarregar
  // - Ícones adicionam contexto visual sem poluição
  // - Hierarquia clara guia o olhar do usuário
  // - Espaço negativo mantém elegância

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-blue-50/30 flex flex-col">
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
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Card de resultado com design minimalista */}
          <motion.div
            className="bg-white border border-border/40 rounded-xl p-8 md:p-12 space-y-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Linha decorativa laranja no topo */}
            <motion.div
              className="h-1 w-16 bg-primary rounded-full"
              variants={itemVariants}
            />

            {/* Título do dorama */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
                {result.title}
              </h1>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-primary fill-primary" />
                <p className="text-2xl text-primary font-semibold">
                  {result.avalue}
                </p>
              </div>
            </motion.div>

            {/* Divisor */}
            <motion.div className="h-px bg-border/40" variants={itemVariants} />

            {/* Gênero */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-primary" />
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Gênero
                </h2>
              </div>
              <p className="text-base text-foreground leading-relaxed ml-8">
                {result.genere}
              </p>
            </motion.div>

            {/* Elenco */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Elenco
                </h2>
              </div>
              <p className="text-base text-foreground leading-relaxed ml-8">
                {result.cast}
              </p>
            </motion.div>

            {/* Sinopse */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Sinopse
                </h2>
              </div>
              <p className="text-base text-foreground leading-relaxed ml-8">
                {result.resume}
              </p>
            </motion.div>

            {/* Divisor final */}
            <motion.div className="h-px bg-border/40" variants={itemVariants} />

            {/* Botão voltar */}
            <motion.div className="flex justify-center pt-4" variants={itemVariants}>
              <Button
                onClick={onBack}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
              >
                Buscar outro dorama
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Background accent - imagem decorativa */}
      <motion.div
        className="fixed top-0 right-0 -z-10 opacity-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/result-card-accent.png"
          alt=""
          className="w-64 h-auto"
        />
      </motion.div>
    </div>
  );
}
