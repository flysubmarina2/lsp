import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AlbumView from "../views/AlbumView.vue";
import NewView from "../views/NewView.vue";
import PlaylistView from "../views/PlaylistView.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/new",
      name: "new",
      component: NewView,
    },
    {
      path: "/playlist",
      name: "playlist",
      component: PlaylistView,
    },
    {
      path: "/albums/one-more-city",
      name: "one-more-city",
      component: AlbumView,
      props: { albumSlug: "one-more-city" },
    },
    {
      path: "/albums/tragic-city",
      name: "tragic-city",
      component: AlbumView,
      props: { albumSlug: "tragic-city" },
    },
    {
      path: "/albums/magic-city",
      name: "magic-city",
      component: AlbumView,
      props: { albumSlug: "magic-city" },
    },
  ],
});

export default router;
