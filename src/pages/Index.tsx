import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Post {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  reactions: {
    [key: string]: number;
  };
  timestamp: string;
}

const EMOJI_REACTIONS = ['❤️', '👍', '😂', '😮', '😢', '🔥'];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Александра Иванова',
        username: '@alexandra',
        avatar: '',
      },
      content: 'Только что запустила новый проект! Делюсь с вами первыми результатами 🚀',
      image: 'https://v3b.fal.media/files/b/panda/8BLwcjsR7DvPldUu0yJ0m_output.png',
      reactions: { '❤️': 42, '👍': 18, '🔥': 7 },
      timestamp: '2 ч назад',
    },
    {
      id: 2,
      author: {
        name: 'Дмитрий Петров',
        username: '@dmitry_p',
        avatar: '',
      },
      content: 'Сегодня отличный день для того, чтобы научиться чему-то новому! Кто со мной? 📚',
      reactions: { '👍': 28, '🔥': 12 },
      timestamp: '5 ч назад',
    },
    {
      id: 3,
      author: {
        name: 'Мария Соколова',
        username: '@maria_s',
        avatar: '',
      },
      content: 'Закат над городом просто невероятный! Делюсь моментом с вами ✨',
      reactions: { '❤️': 156, '😮': 34, '🔥': 21 },
      timestamp: '8 ч назад',
    },
  ]);

  const [showReactions, setShowReactions] = useState<number | null>(null);

  const handleReaction = (postId: number, emoji: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        return { ...post, reactions: newReactions };
      }
      return post;
    }));
    setShowReactions(null);
  };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Лента' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
    { id: 'messages', icon: 'MessageCircle', label: 'Сообщения' },
    { id: 'notifications', icon: 'Bell', label: 'Уведомления' },
    { id: 'friends', icon: 'Users', label: 'Друзья' },
    { id: 'communities', icon: 'Users2', label: 'Сообщества' },
    { id: 'search', icon: 'Search', label: 'Поиск' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border p-6 flex flex-col gap-2 fixed h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SOCIAL NETWORK
          </h1>
        </div>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === item.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      <main className="flex-1 ml-64">
        <div className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">Вы</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    placeholder="Что у вас нового?"
                    className="w-full bg-secondary border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      Опубликовать
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card border-border overflow-hidden animate-fade-in">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                        <span className="text-muted-foreground text-sm">{post.author.username}</span>
                        <span className="text-muted-foreground text-sm">· {post.timestamp}</span>
                      </div>
                      <p className="text-foreground mt-2">{post.content}</p>
                    </div>
                  </div>

                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full rounded-lg mb-4"
                    />
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      {Object.entries(post.reactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-full hover:bg-muted transition-colors"
                          onClick={() => handleReaction(post.id, emoji)}
                        >
                          <span className="text-lg">{emoji}</span>
                          <span className="text-sm text-muted-foreground">{count}</span>
                        </button>
                      ))}
                    </div>

                    <div className="relative ml-auto">
                      <button
                        className="px-4 py-2 bg-secondary rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                        onClick={() => setShowReactions(showReactions === post.id ? null : post.id)}
                      >
                        <Icon name="Smile" size={18} />
                        <span className="text-sm">Реакция</span>
                      </button>

                      {showReactions === post.id && (
                        <div className="absolute bottom-full mb-2 right-0 bg-card border border-border rounded-lg p-2 flex gap-1 shadow-lg animate-scale-in">
                          {EMOJI_REACTIONS.map((emoji) => (
                            <button
                              key={emoji}
                              className="text-2xl hover:scale-125 transition-transform p-2 hover:bg-secondary rounded"
                              onClick={() => handleReaction(post.id, emoji)}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                      <Icon name="MessageCircle" size={18} />
                      <span className="text-sm">Комментарии</span>
                    </button>

                    <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-muted transition-colors">
                      <Icon name="Share2" size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <aside className="w-80 border-l border-border p-6 fixed right-0 h-screen overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Актуальное</h2>
          <div className="space-y-3">
            {['Новости технологий', 'Дизайн', 'Программирование'].map((topic) => (
              <div
                key={topic}
                className="p-4 bg-card border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              >
                <p className="text-sm text-muted-foreground">Тренд</p>
                <p className="font-medium">{topic}</p>
                <p className="text-sm text-muted-foreground">2.4K публикаций</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Рекомендации</h2>
          <div className="space-y-3">
            {[
              { name: 'Анна Кузнецова', username: '@anna_k' },
              { name: 'Игорь Волков', username: '@igor_v' },
              { name: 'Елена Морозова', username: '@elena_m' },
            ].map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.username}</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  Подписаться
                </Button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
