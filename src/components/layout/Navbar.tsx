
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CN</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">ComptaNova</h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Fonctionnalités
          </button>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Tarifs
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            À propos
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
          >
            Connexion
          </Button>
          <Button onClick={() => navigate('/signup')}>
            Essai gratuit
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
