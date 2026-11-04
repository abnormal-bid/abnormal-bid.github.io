/**
 * 把「咨询与服务适用{terms}与{privacy}。」这样的文案模板拆开，{名字} 换成传入的内容（通常是链接）。
 * 空格与语序都写在各语言的文案里，组件不再自己补空格；模板里有但没传的名字直接报错，预渲染时就能发现拼写错误。
 */
export function fillTemplate<T>(template: string, slots: Record<string, T>): (string | T)[] {
  const parts: (string | T)[] = [];
  template.split(/\{(\w+)\}/).forEach((part, index) => {
    if (index % 2 === 0) {
      if (part) parts.push(part);
    } else if (Object.hasOwn(slots, part)) {
      parts.push(slots[part]!);
    } else {
      throw new Error(`文案模板「${template}」缺少 {${part}}`);
    }
  });
  return parts;
}
