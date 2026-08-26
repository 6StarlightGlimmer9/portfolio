/**
 * 工具函数
 */

/**
 * 将带空格/括号的素材文件名编码为可用的 URL 路径。
 * 例如 " (1).jfif" -> "%20%281%29.jfif"
 * 用 fixedEncodeURIComponent 对文件名部分编码，保留 / 分隔符。
 */
export function media(path: string): string {
  const parts = path.split("/");
  const encoded = parts
    .map((p, i) => (i === parts.length - 1 ? fixedEncodeURIComponent(p) : p))
    .join("/");
  return encoded;
}

function fixedEncodeURIComponent(str: string): string {
  return encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

/** 拼接 class 名 */
export function cx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}
