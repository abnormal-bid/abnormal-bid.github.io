import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { Eyebrow, HeadingMark, SectionTitle, sectionSpaceClassName } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { desktopDownloads, type Lang } from "@/data/site";
import { useCopy } from "@/i18n";
import { Icon } from "./Icon";

/** 桌面客户端下载页：两个平台各一张卡片，下面是登录说明与校验值。 */
export function Download({ lang }: { lang: Lang }) {
  const { t, links } = useCopy(lang);
  const d = t.download;
  const platforms = [
    { ...d.macos, href: desktopDownloads.macos, brew: true },
    { ...d.windows, href: desktopDownloads.windows, brew: false },
  ];

  return (
    <section aria-labelledby="download-title">
      <Container className={sectionSpaceClassName}>
        <Eyebrow lang="en">{d.eyebrow}</Eyebrow>
        <SectionTitle asChild>
          <h1 id="download-title">
            {d.title}
            <HeadingMark>{t.dot}</HeadingMark>
          </h1>
        </SectionTitle>
        <p className="mt-4 max-w-2xl text-md/prose text-muted-foreground">{d.intro}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {platforms.map((platform) => (
            <Card className="gap-0 px-[1.4rem] pt-6 pb-[1.4rem] max-sm:p-6" key={platform.name}>
              <span className="flex items-center gap-3">
                <IconTile aria-hidden="true">
                  <Icon name="monitor" className="size-5" />
                </IconTile>
                <h2 className="text-xl/[1.4] font-semibold tracking-[-0.01em]">{platform.name}</h2>
              </span>
              <p className="mt-4 text-base/prose text-muted-foreground">{platform.requirement}</p>
              <div className="mt-6">
                <Button asChild size="lg">
                  <a href={platform.href} download>
                    {platform.download}
                    <Icon name="arrow" className="size-4 rotate-90" />
                  </a>
                </Button>
              </div>
              {platform.brew && (
                <div className="mt-5">
                  <p className="text-sm/[1.6] text-muted-foreground">{d.macos.brewLabel}</p>
                  <pre className="mt-2 overflow-x-auto rounded-control border border-border bg-control px-3 py-2 font-mono text-sm/[1.6]">
                    <code>{desktopDownloads.brew}</code>
                  </pre>
                </div>
              )}
              <p className="mt-5 border-t border-border pt-4 text-sm/[1.6] text-muted-foreground">
                {platform.firstLaunch}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl/[1.4] font-semibold tracking-[-0.01em]">{d.signInTitle}</h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-base/prose text-muted-foreground">
            {d.signInSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2">
          <TextLink className="text-sm/[1.6]" href={desktopDownloads.manifest}>
            {d.checksums} <Icon name="up-right" className="size-3.5" />
          </TextLink>
          <span className="text-sm/[1.6] text-muted-foreground">
            {d.webmailNote}
            {t.space}
            <TextLink href={links.webmail}>
              {d.webmailLink} <Icon name="up-right" className="size-3.5" />
            </TextLink>
          </span>
        </div>
      </Container>
    </section>
  );
}
