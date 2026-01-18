import type { Component, JSX } from 'solid-js';
import { splitProps, For } from 'solid-js';
import type { PrismLanguage } from './languages-available';
import { Prism } from './prism';
import type { Theme } from './themes';

export type CodeBlockProps = Readonly<
  JSX.HTMLAttributes<HTMLPreElement> & {
    lineNumbers?: boolean;
    fontFamily?: string;
    theme: Theme;
    language: PrismLanguage;
    code: string;
  }
>;

const stylesForToken = (token: Prism.Token, theme: Theme): JSX.CSSProperties => {
  let styles = { ...theme[token.type] } as JSX.CSSProperties;

  const aliases = Array.isArray(token.alias) ? token.alias : [token.alias];

  for (const alias of aliases) {
    styles = { ...styles, ...theme[alias] };
  }

  return styles;
};

const CodeBlockLine: Component<{
  token: string | Prism.Token;
  theme: Theme;
  inheritedStyles?: JSX.CSSProperties;
}> = (props) => {
  if (props.token instanceof Prism.Token) {
    const styleForToken = (): JSX.CSSProperties => ({
      ...props.inheritedStyles,
      ...stylesForToken(props.token as Prism.Token, props.theme),
    });

    const token = props.token as Prism.Token;

    if (token.content instanceof Prism.Token) {
      return (
        <span style={styleForToken()}>
          <CodeBlockLine theme={props.theme} token={token.content} />
        </span>
      );
    }

    if (typeof token.content === 'string') {
      return <span style={styleForToken()}>{token.content}</span>;
    }

    return (
      <For each={token.content as (string | Prism.Token)[]}>
        {(subToken) => (
          <CodeBlockLine
            inheritedStyles={styleForToken()}
            theme={props.theme}
            token={subToken}
          />
        )}
      </For>
    );
  }

  return (
    <span style={props.inheritedStyles}>
      {(props.token as string).replaceAll(' ', '\xA0\u200D\u200B')}
    </span>
  );
};

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [local, others] = splitProps(props, [
    'code',
    'fontFamily',
    'lineNumbers',
    'theme',
    'language',
    'style',
  ]);

  const languageGrammar = () => {
    const grammar = Prism.languages[local.language];
    if (typeof grammar === 'undefined') {
      throw new Error(
        `CodeBlock: There is no language defined on Prism called ${local.language}`,
      );
    }
    return grammar;
  };

  const lines = () => local.code.split(/\r\n|\r|\n/gm);

  const tokensPerLine = () =>
    lines().map((line) => Prism.tokenize(line, languageGrammar()));

  return (
    <pre
      {...others}
      style={{ ...local.theme.base, width: '100%', ...local.style as JSX.CSSProperties }}
    >
      <code>
        <For each={tokensPerLine()}>
          {(tokensForLine, lineIndex) => (
            <>
              {local.lineNumbers ? (
                <span
                  style={{
                    width: '2em',
                    height: '1em',
                    display: 'inline-block',
                    'font-family': local.fontFamily,
                  }}
                >
                  {lineIndex() + 1}
                </span>
              ) : null}

              <For each={tokensForLine}>
                {(token) => (
                  <CodeBlockLine
                    inheritedStyles={{ 'font-family': local.fontFamily }}
                    theme={local.theme}
                    token={token}
                  />
                )}
              </For>
              <br />
            </>
          )}
        </For>
      </code>
    </pre>
  );
};
