import { media } from "@/lib/utils";

export interface MediaItem {
  src: string;
  type: "image" | "video";
  label: string;
}

export interface PortfolioCategory {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  items: MediaItem[];
}

function img(dir: string, file: string, label: string): MediaItem {
  return { src: media(`/${dir}/${file}`), type: "image", label };
}

function vid(dir: string, file: string, label: string): MediaItem {
  return { src: media(`/${dir}/${file}`), type: "video", label };
}

/** 1. 游戏 Mod 开发（来自简历 Steam创意工坊 项目） */
const modItems: MediaItem[] = [
  img("mod", "(1).jpg", "Mod 01"),
  img("mod", "(2).jpg", "Mod 02"),
  img("mod", "(3).jpg", "Mod 03"),
  img("mod", "(4).jpg", "Mod 04"),
  img("mod", "(5).jpg", "Mod 05"),
  img("mod", "(6).jpg", "Mod 06"),
  img("mod", "(7).jpg", "Mod 07"),
  img("mod", "(8).jpg", "Mod 08"),
  img("mod", "(9).jpg", "Mod 09"),
  img("mod", "(10).jpg", "Mod 10"),
];

/** 2. 校园场景全栈管理系统开发 */
const systemItems: MediaItem[] = [
  vid("system", "(1).mp4", "系统演示"),
  img("system", "(1).png", "系统 01"),
  img("system", "(2).png", "系统 02"),
  img("system", "(3).png", "系统 03"),
  img("system", "(4).png", "系统 04"),
  img("system", "(5).png", "系统 05"),
  img("system", "(6).png", "系统 06"),
  img("system", "(7).png", "系统 07"),
  img("system", "(8).png", "系统 08"),
];

/** 3. 校园失物招领小程序 */
const lostfoundItems: MediaItem[] = [
  img("lostfound", "(1).png", "小程序 01"),
  img("lostfound", "(2).png", "小程序 02"),
  img("lostfound", "(3).png", "小程序 03"),
  img("lostfound", "(4).png", "小程序 04"),
  img("lostfound", "(5).png", "小程序 05"),
  img("lostfound", "(6).png", "小程序 06"),
  img("lostfound", "(7).png", "小程序 07"),
  img("lostfound", "(8).png", "小程序 08"),
  img("lostfound", "(9).png", "小程序 09"),
];

/** 4. 社媒运营 / 视频创作 */
const socialItems: MediaItem[] = [
  vid("social", "(1).mp4", "社媒 01"),
  vid("social", "(2).mp4", "社媒 02"),
  vid("social", "(3).mp4", "社媒 03"),
  vid("social", "(4).mp4", "社媒 04"),
  vid("social", "(5).mp4", "社媒 05"),
  vid("social", "(6).mp4", "社媒 06"),
  vid("social", "(7).mp4", "社媒 07"),
  vid("social", "(8).mp4", "社媒 08"),
  vid("social", "(9).mp4", "社媒 09"),
];

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: "mod",
    title: "游戏 Mod 开发",
    subtitle: "GAME MOD DEV",
    desc: "基于 PDX Script 编写核心玩法逻辑，独立完成《钢铁雄心4》《维多利亚3》Mod 开发，Steam 创意工坊订阅量突破 3000。",
    items: modItems,
  },
  {
    id: "social",
    title: "社媒运营作品",
    subtitle: "SOCIAL MEDIA",
    desc: "独立负责短视频全流程产出，全网累计流量超 40 万，粉丝突破 2500，单条最高播放破万。",
    items: socialItems,
  },
  {
    id: "system",
    title: "校园全栈管理系统",
    subtitle: "FULL-STACK SYSTEM",
    desc: "Java + Spring Boot + Vue3 前后端分离，含人事文件管理、教室预约、图书馆管理等，三套系统从 0 到 1 落地。",
    items: systemItems,
  },
  {
    id: "lostfound",
    title: "校园失物招领小程序",
    subtitle: "MINI PROGRAM",
    desc: "Spring Boot + Vue 微信小程序，前后端分离架构，集成 JWT 鉴权，全程独立负责需求、架构、联调与汇报。",
    items: lostfoundItems,
  },
];

/** 实习经历图片 */
export const internshipImages: string[] = [
  media("/internship/(1).png"),
  media("/internship/(2).png"),
  media("/internship/(3).png"),
];

/** Hero 背景视频 */
export const heroVideo = media("/hero/背景.mp4");

/** 简历：个人信息 */
export const profile = {
  name: "韩石锋",
  nameEn: "HAN SHIFENG",
  status: "27届应届毕业生 · 立即到岗",
  birthday: "2005/01",
  major: "软件工程 · 本科",
  school: "重庆移通学院",
  email: "1322093404@qq.com",
  phone: "18698080586",
};

/** 简历：个人简介（分段，每段前加红点） */
export const bioParagraphs: string[] = [
  "你好，我是韩石锋，重庆移通学院软件工程专业 27 届应届毕业生，2005 年 1 月出生。",
  "三重核心经验：游戏 Mod 独立开发（Steam 创意工坊订阅量 3000+）、短视频全流程运营（全网流量 40 万+，粉丝 2500+，单条最高播放破万）、全栈项目从 0 到 1 落地（三套校园管理系统均通过项目验收）。",
  "技术上熟练使用 C++ / Python / JavaScript / Lua 等开发语言，掌握 Spring Boot / Vue3 / MySQL / SQLite 等技术栈；创作上精通 Photoshop / Premiere / After Effects / 剪映 / 达芬奇等后期工具。",
  "曾担任古剑书院新媒体技术部部长，获「最具技术性的人」荣誉称号；校园电竞文化节核心策划，负责舞台气氛营造与现场背景视频制作，获年度十大品牌活动；中德文化节双语视频大赛获二等奖；暑期「三下乡」社会实践获 C 类优秀团队。",
  "擅长在技术实现与视觉把控之间找到平衡，无论是代码架构还是交互动效，都追求细节与品质。期待加入你的团队，带来技术能力与创意视角的双重价值。",
];

/** 简历：技能标签 */
export const skills: { group: string; tags: string[] }[] = [
  {
    group: "开发语言",
    tags: ["C++", "Python", "JavaScript(ES6+)", "HTML5", "CSS3", "Lua"],
  },
  {
    group: "常用编程软件",
    tags: ["TraeCode", "CodeX", "notepad++", "IntelliJIDEA", "PyCharm", "HBuilder"],
  },
  {
    group: "常用后期制作软件",
    tags: ["Adobe Photoshop", "Adobe Premiere", "Adobe After Effects", "剪映", "达芬奇"],
  },
];

/** 简历：实习经历（仅一段） */
export const internship = {
  period: "2026.07 - 2026.09",
  role: "游戏运维实习生",
  company: "天津青纤网络科技有限公司",
  descParagraphs: [
    "配合开发团队完成游戏版本更新包上传部署，参与新版本测试工作，整理测试日志，记录 BUG 与兼容性问题，协助迭代版本问题闭环。",
    "承担游戏 GM 工作，处理服务器内玩家相关事务，开展服务器内玩家互动运营，维护服务器社区氛围，收集反馈玩家体验问题。",
    "使用 AI 大模型 Token 辅助游戏相关内容开发，学习魔兽 MMO 项目开发规范，协助排查版本更新引发的服务端、客户端异常。",
    "保障多轮游戏版本顺利上线，协助完成多轮版本测试，玩家反馈问题做到及时收集归档，保障服务器稳定运营。",
  ],
  tags: ["版本运维", "GM后台", "日志分析", "AI辅助开发", "MMO"],
};

/** 联系方式 */
export const contactLinks: { label: string; value: string; href: string }[] = [
  { label: "EMAIL", value: "1322093404@qq.com", href: "mailto:1322093404@qq.com" },
  { label: "PHONE", value: "18698080586", href: "tel:18698080586" },
  { label: "QQ", value: "1322093404", href: "tencent://message/?uin=1322093404" },
  { label: "LOCATION", value: "重庆 / 天津", href: "#" },
];

/** 社交链接（用户自行填写） */
export const socialLinks: { platform: string; href: string }[] = [
  { platform: "bilibili", href: "https://b23.tv/yygiK7W" },
  { platform: "douyin1", href: "https://v.douyin.com/tCnX12-HWvs" },
  { platform: "douyin2", href: "https://v.douyin.com/keEkYvGlo2o" },
  { platform: "pixiv", href: "https://www.pixiv.net/users/62020181/artworks" },
];

/** 教育经历 - 用于 About 展示 */
export const education = {
  school: "重庆移通学院",
  degree: "软件工程 · 本科",
  period: "2023/09 - 至今",
  highlights: [
    "任校园电竞文化节核心策划，负责舞台气氛营造、现场拍摄及后期制作，获年度十大品牌活动",
    "任古剑书院新媒体技术部部长，获「最具技术性的人」荣誉称号",
    "中德文化节双语视频征集大赛获二等奖",
    "暑期「三下乡」社会实践获 C 类优秀团队",
  ],
};