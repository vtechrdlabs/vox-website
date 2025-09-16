import { AlertTriangle, ArrowRight } from "lucide-react";

export const VoxPainPoints = () => {
  // Conteúdo estático
  const content = {
    pain_title: "Sua realidade hoje é assim?",
    pain_point_1: "Sua empresa não anda sem você?",
    pain_point_2: "Processos confusos e improviso todo dia?",
    pain_point_3: "Cresce, mas sem previsibilidade nem controle?",
    pain_point_4: "Vende, mas sente que falta estratégia?",
    pain_conclusion: "Se sim, o Vox Elite é o próximo passo."
  };

  const painPoints = [
    content.pain_point_1,
    content.pain_point_2,
    content.pain_point_3,
    content.pain_point_4
  ];

  return (
    <section className="py-20 bg-vox-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {content.pain_title}
            </h2>
          </div>
        </div>
        
        <div className="space-y-6 mb-12">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="vox-backdrop-blur rounded-xl p-6 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <p className="text-lg text-white font-medium flex-1">{point}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="vox-backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center mb-4">
              <p className="text-xl font-bold text-white">
                {content.pain_conclusion.split('Vox Elite')[0]}<span className="vox-gradient-text">Vox Elite</span>{content.pain_conclusion.split('Vox Elite')[1] || ''}
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-vox-secondary mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};