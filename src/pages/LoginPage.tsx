import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../store/contexts/ToastContext';
import { signInWithPassword } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithPassword({ email, password });
      showToast('ログインしました', 'success');
      navigate('/');
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  return (
    <div className="panel max-w-md mx-auto rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center">ログイン</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        アカウントをお持ちでないですか？{' '}
        <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
          新規登録
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
