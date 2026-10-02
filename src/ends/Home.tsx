import { Link } from 'react-router-dom';
import { GrowthTree } from '../components/GrowthTree';
import { useTree } from '../context/TreeContext';
import './Home.css';

export function Home() {
  const { state } = useTree();

  return (
    <div className="home zh-ambient">
      <header className="home__topbar">
        <div className="home__brand">知护</div>
        <nav className="home__nav">
          <Link to="/student">学生</Link>
          <Link to="/guardian/overview">家长 / 教师</Link>
          <Link to="/school/trend">学校</Link>
        </nav>
      </header>

      <section className="home__hero">
        <div className="home__hero-text zh-anim-up">
          <h1>让 AI 发现风险，<br />更让学生学会面对风险</h1>
          <p>陪伴学生在信息、网络交往与学习中，逐渐形成自己的判断。</p>
          <div className="home__cta">
            <Link to="/student" className="home__cta-main">进入学生端</Link>
          </div>
        </div>
        <div className="home__hero-tree zh-float">
          <GrowthTree state={state} size={320} />
        </div>
      </section>

      <footer className="home__footer">知护</footer>
    </div>
  );
}
