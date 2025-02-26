import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

/**
 * 格式化名称
 * @param text
 * @returns {string}
 */
function formatText(text: string) {
  // 去除后缀
  text = text.replace(".md", "");
  // 去除前缀 副业搞钱100问之001_
  text = text.replace(/副业搞钱100问之\d{3}_/, "");
  // 去除下划线
  text = text.replace("_", "");
  // 去除标点符合
  text = text.replace(/[\?？]/, "");
  // 去除空格
  text = text.trim();

  return text;
}

function getSidebar(dir: string): any[] {
  const files = fs.readdirSync(path.resolve(__dirname, dir));
  // ../方向选择 => 方向选择
  const group = dir.split("/")[1];

  const sidebar = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      text: formatText(file),
      link: `/${group}/${file.replace(".md", "")}`,
    }));

  console.log(sidebar);
  return sidebar;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "副业搞钱100问",
  description: "关于副业搞钱的100个问题. 内容全部由 DeepSeek 生成.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: "deep",
    nav: [
      // {
      //   text: "副业搞钱100问",
      //   link: "方向选择/副业搞钱100问之001_%20我适合做什么类型的副业？.html",
      // },
    ],

    sidebar: [
      {
        text: "方向选择(20问)",
        items: getSidebar("../方向选择"),
        collapsed: true,
      },
      {
        text: "技能提升(20问)",
        items: getSidebar("../技能提升"),
        collapsed: true,
      },
      {
        text: "平台运营(20问)",
        items: getSidebar("../平台运营"),
        collapsed: true,
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
