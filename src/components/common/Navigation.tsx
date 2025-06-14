import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "../../api/authApi";
import { useToast } from "../../store/contexts/ToastContext";

export function Navigation() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      showToast('ログアウトしました', 'success');
      navigate('/login');
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-4 py-2 rounded-md font-semibold ${isActive ? 'active' : ''}`;

  return (
    <nav className="mt-6 flex justify-center gap-4">
      <NavLink to="/book" className={getNavLinkClass}>書籍検索</NavLink>
      <NavLink to="/bookshelf" className={getNavLinkClass}>マイ本棚</NavLink>
      {isAuthenticated ? (
        <button onClick={handleSignOut} className="nav-link px-4 py-2 rounded-md font-semibold">ログアウト</button>
      ) : (
        <NavLink to="/signup" className={getNavLinkClass}>サインアップ</NavLink>
      )}
    </nav>
  );
}
