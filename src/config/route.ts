import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import Profile from "../pages/ProfilePage.vue";
import Search from "../pages/SearchPage.vue";
import ProfileEditPage from "../pages/ProfileEditPage.vue";
import UserResultPage from "../pages/UserResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdateTeam from "../pages/TeamUpdateTeam.vue";
import ProfileUpdatePage from "../pages/ProfileUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";


// 2. Define some routes
// Each route should map to a component.
const routes = [
    {path: '/', component: Index},
    {path: '/team', title: 'Find Team', component: Team},
    {path: '/profile', title: 'Profile', component: Profile},
    {path: '/search', title: 'Find New Friends', component: Search},
    {path: '/user/edit', title: 'Edit', component: ProfileEditPage},
    {path: '/user/update', title: 'Update Profile', component: ProfileUpdatePage},
    {path: '/user/list', title: 'User List', component: UserResultPage},
    {path: '/user/login', title: 'Login', component: UserLoginPage},
    {path: '/team/add', title: 'Create Team', component: TeamAddPage},
    {path: '/team/update', title: 'Update Team', component: TeamUpdateTeam},
    {path: '/user/team/join', title: 'Joined Team', component: UserTeamJoinPage},
    {path: '/user/team/create', title: 'My Team', component: UserTeamCreatePage},




]

export default routes;