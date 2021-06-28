export interface NavItem {
  path: string;
  i18nKey: string;
}

const NavItems: NavItem[] = [
  {
    path: "/things",
    i18nKey: "things.noun_titlecase_plural",
  },
  {
    path: "/settings",
    i18nKey: "settings.noun_titlecase_plural",
  },
];

export default NavItems;
