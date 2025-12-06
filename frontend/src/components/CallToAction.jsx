import './CallToAction.css';
import { useAuth } from '../AuthContext';

export default function CTA() {
  const { user } = useAuth();
  const firstName = user?.username ? user.username.split(' ')[0] : '';
  return (
    <div className="cta-banner">
      <p>
        {
          user ? `Salut, ${firstName}! Ești gata să faci următorul grătar?` :
          `Înregistrează-te pentru a intra și tu în cea mai mare rețea de grătaragii din lume!`
        }
      </p>
    </div>
  );
}