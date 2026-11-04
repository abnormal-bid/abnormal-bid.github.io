/**
 * Fills a copy template such as "咨询与服务适用{terms}与{privacy}。", swapping each {name} for the given part (usually
 * a link). Spacing and word order stay in each language's copy, so components add no spaces of their own. A name the
 * template uses but the caller does not pass throws, so a typo fails the prerender instead of shipping.
 */
export function fillTemplate<T>(template: string, slots: Record<string, T>): (string | T)[] {
  const parts: (string | T)[] = [];
  template.split(/\{(\w+)\}/).forEach((part, index) => {
    if (index % 2 === 0) {
      if (part) parts.push(part);
    } else if (Object.hasOwn(slots, part)) {
      parts.push(slots[part]!);
    } else {
      throw new Error(`The copy template "${template}" has no value for {${part}}`);
    }
  });
  return parts;
}
