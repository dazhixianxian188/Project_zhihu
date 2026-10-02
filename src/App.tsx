import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StageProvider } from './context/StageContext';
import { TreeProvider } from './context/TreeContext';
import { Home } from './ends/Home';
import { StudentLayout } from './ends/student/StudentLayout';
import { StudentHome } from './ends/student/pages/StudentHome';
import { Simulator } from './ends/student/pages/Simulator';
import { Growth } from './ends/student/pages/Growth';
import { Insight } from './ends/student/pages/Insight';
import { Relations } from './ends/student/pages/Relations';
import { Learning } from './ends/student/pages/Learning';
import { Records } from './ends/student/pages/Records';
import { Report } from './ends/student/pages/Report';
import { Demos } from './ends/student/pages/Demos';
import { DemoFlow } from './ends/student/pages/DemoFlow';
import { Tree } from './ends/student/pages/Tree';
import { Assistant } from './ends/student/pages/Assistant';
import { GuardianLayout } from './ends/guardian/GuardianLayout';
import { Overview } from './ends/guardian/pages/Overview';
import { Analysis } from './ends/guardian/pages/Analysis';
import { Suggest } from './ends/guardian/pages/Suggest';
import { GuardianIntervention } from './ends/guardian/pages/GuardianIntervention';
import { SchoolLayout } from './ends/school/SchoolLayout';
import { RiskEvents } from './ends/school/pages/RiskEvents';
import { SchoolTrend } from './ends/school/pages/SchoolTrend';
import { SchoolIntervention } from './ends/school/pages/SchoolIntervention';
import { Review } from './ends/school/pages/Review';
import { Permission } from './ends/school/pages/Permission';
import { DataGovernance } from './ends/school/pages/DataGovernance';

export default function App() {
  return (
    <StageProvider>
      <TreeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* 学生端 */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentHome />} />
              <Route path="simulator" element={<Simulator />} />
              <Route path="growth" element={<Growth />} />
              <Route path="insight" element={<Insight />} />
              <Route path="relations" element={<Relations />} />
              <Route path="learning" element={<Learning />} />
              <Route path="records" element={<Records />} />
            <Route path="report" element={<Report />} />
            <Route path="demos" element={<Demos />} />
            <Route path="demo-flow" element={<DemoFlow />} />
            <Route path="tree" element={<Tree />} />
              <Route path="assistant" element={<Assistant />} />
            </Route>

            {/* 家长/教师端 */}
            <Route path="/guardian" element={<GuardianLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<Overview />} />
              <Route path="trend" element={<Overview />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="suggest" element={<Suggest />} />
              <Route path="intervention" element={<GuardianIntervention />} />
            </Route>

            {/* 学校管理端 */}
            <Route path="/school" element={<SchoolLayout />}>
              <Route index element={<Navigate to="trend" replace />} />
              <Route path="trend" element={<SchoolTrend />} />
              <Route path="events" element={<RiskEvents />} />
              <Route path="intervention" element={<SchoolIntervention />} />
              <Route path="review" element={<Review />} />
              <Route path="permission" element={<Permission />} />
              <Route path="data" element={<DataGovernance />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TreeProvider>
    </StageProvider>
  );
}
