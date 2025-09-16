import { VoxHero } from "@/components/VoxHero";
import { VoxPainPoints } from "@/components/VoxPainPoints";
import { VoxAbout } from "@/components/VoxAbout";
import { VoxBenefits } from "@/components/VoxBenefits";
import { VoxMentors } from "@/components/VoxMentors";
import { VoxTestimonials } from "@/components/VoxTestimonials";
import { VoxFAQ } from "@/components/VoxFAQ";
import VoxContactForm from "@/components/VoxContactForm";

export default function HomePage() {
  return (
    <div className="dark min-h-screen bg-vox-dark relative">
      <VoxHero />
      <VoxPainPoints />
      <VoxAbout />
      <VoxBenefits />
      <VoxMentors />
      <VoxTestimonials />
      
      <VoxContactForm />
      <VoxFAQ />
      
      {/* Footer Copyright */}
      <footer className="py-8 bg-vox-darker border-t border-vox-secondary/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 - Todos os direitos reservados a Vox Elite.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}