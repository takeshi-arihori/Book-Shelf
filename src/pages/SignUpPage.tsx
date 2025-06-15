import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useToast } from '../store/contexts/ToastContext';
import { signUpNewUser } from '../api/authApi';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUpNewUser({ email, password, username });
      showToast('登録が完了しました。確認メールをチェックしてください。', 'success');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast('不明なエラーが発生しました。', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel max-w-md mx-auto rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center">新規登録</h2>
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
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? '登録中...' : '新規登録'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-4">
        すでにアカウントをお持ちですか？{' '}
        <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
          ログイン
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
