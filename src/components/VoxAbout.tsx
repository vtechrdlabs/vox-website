import { Calendar, MapPin, Users } from "lucide-react";

export const VoxAbout = () => {
  // Conteúdo estático - depois você pode conectar com sua API
  const content = {
    about_title: "O que é o Vox Elite",
    about_subtitle_1: "O Vox Elite é uma imersão exclusiva de mentoria estratégica para empresários do polo que querem levar seus negócios ao próximo nível.",
    about_subtitle_2: "Aqui você aprende com mentores renomados, troca experiências com empresários selecionados e encontra soluções práticas para crescer com previsibilidade.",
    about_date: "04 e 05 de outubro",
    about_location: "Vox Educação",
    about_capacity: "Vagas limitadas"
  };

  return (
    <section className="py-20 bg-vox-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            {content.about_title.split('Vox Elite')[0]}<span className="vox-gradient-text">Vox Elite</span>{content.about_title.split('Vox Elite')[1] || ''}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
              {content.about_subtitle_1}
            </p>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-12">
              {content.about_subtitle_2}
            </p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="vox-backdrop-blur rounded-2xl p-8 text-center transition-all duration-500 animate-scale-in md:hover:scale-105">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                <Calendar className="w-6 h-6 text-vox-secondary" />
                <div>
                  <h3 className="text-lg font-bold text-white">Primeira turma</h3>
                  <p className="text-vox-secondary font-semibold">{content.about_date}</p>
                </div>
              </div>
              
              <div className="border-t border-vox-secondary/20 pt-6">
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-6 h-6 text-vox-secondary" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Local</h3>
                    <p className="text-vox-secondary font-semibold">{content.about_location}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-vox-secondary/20 pt-6">
                <div className="flex items-center justify-center gap-3">
                  <Users className="w-6 h-6 text-vox-secondary" />
                  <div>
                    <h3 className="text-lg font-bold text-white">Exclusivo</h3>
                    <p className="text-vox-secondary font-semibold">{content.about_capacity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};