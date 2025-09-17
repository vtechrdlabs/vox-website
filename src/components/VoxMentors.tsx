import Image from "next/image";

export const VoxMentors = () => {
  // Conteúdo estático
  const content = {
    mentors_title: "Aprenda com quem faz",
    mentor_1_name: "Rodrigo Fernandes",
    mentor_1_description_1: "Senior Partner na VPx e mentor no G4 Educação.",
    mentor_1_description_2: "Advisor em empresas como Pingback, Tânia Bulhões e Templo Educação.",
    mentor_1_description_3:
      "Cofundador da Eteg e da Escola em Movimento, adquirida pelo grupo Arco Educação (NYSE: ARCO).",
    mentor_1_description_4: "Especialista em finanças e estratégia, com publicações no Brasil e no exterior.",
    mentor_2_name: "Cléo Scarabello",
    mentor_2_description_1: "Executivo Global com 30 anos de experiência na Unilever, atuando em 43 países.",
    mentor_2_description_2:
      "Mentor de Negócios e Carreiras no G4 Educação desde 2019, já impactou mais de 200 empresários.",
    mentor_2_description_3: "Especialista em estratégia, gestão e pessoas.",
    mentor_2_description_4: "Palestrante em negócios, comportamento humano e comunicação de alto impacto.",
    mentor_1_image: "/rodrigo-fernandes.png",
    mentor_2_image: "/cleo-scarabello.png",
  };

  type Mentor = {
    name: string;
    image: string;
    description: string[];
  };

  const mentors: Mentor[] = [
    {
      name: content.mentor_1_name,
      image: content.mentor_1_image,
      description: [
        content.mentor_1_description_1,
        content.mentor_1_description_2,
        content.mentor_1_description_3,
        content.mentor_1_description_4,
      ],
    },
    {
      name: content.mentor_2_name,
      image: content.mentor_2_image,
      description: [
        content.mentor_2_description_1,
        content.mentor_2_description_2,
        content.mentor_2_description_3,
        content.mentor_2_description_4,
      ],
    },
  ];

  return (
    <section className="py-20 bg-vox-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Você irá aprender com quem faz! Conheça nossos mentores:
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.name}
              className="vox-backdrop-blur rounded-2xl p-8 animate-fade-in transition-all duration-300 md:hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-vox-card">
                    {/* ✅ next/image otimizado */}
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 192px, 192px"
                      priority={index === 0}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">{mentor.name}</h3>

                  <div className="space-y-3">
                    {mentor.description.map((item, idx) => (
                      <p key={`${mentor.name}-${idx}`} className="text-gray-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
