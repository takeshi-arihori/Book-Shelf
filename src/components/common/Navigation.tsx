import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { signOut } from "../../api/authApi";
import { useToast } from "../../store/contexts/ToastContext";

export function Navigation() {
  const { session } = useAuthContext();
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
    `nav-link px-6 py-2 rounded-md font-semibold ${isActive ? 'active' : ''}`.trim();

  return (
    <nav className="mt-6 flex justify-center gap-4 mb-8">
      <NavLink to="/" className={getNavLinkClass} end>書籍検索</NavLink>
      <NavLink to={session ? "/bookshelf" : "/login"} className={getNavLinkClass}>マイ本棚</NavLink>
      {session ? (
        <button onClick={handleSignOut} className="nav-link px-6 py-2 rounded-md font-semibold">ログアウト</button>
      ) : (
        <NavLink to="/signup" className={getNavLinkClass}>サインアップ</NavLink>
      )}
    </nav>
  );
}
