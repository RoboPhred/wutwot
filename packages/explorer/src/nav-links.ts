import { ThingsPagePath, SettingsPagePath } from "@/paths";

export interface NavItem {
  path: string;
  i18nKey: string;
}

const NavItems: NavItem[] = [
  {
    path: ThingsPagePath.path,
    i18nKey: "things.noun_titlecase_plural",
  },
  {
    path: SettingsPagePath.path,
    i18nKey: "settings.noun_titlecase_plural",
  },
];

export default NavItems;
