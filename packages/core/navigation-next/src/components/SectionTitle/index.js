// @flow

import React from 'react';

import { withContentTheme } from '../../theme';
import type { SectionTitlePrimitiveProps } from './types';

const SectionTitle = ({
  after: After,
  children,
  theme,
}: SectionTitlePrimitiveProps) => {
  const { mode, context } = theme;
  const styles = mode.sectionTitle()[context];

  return (
    <div css={styles.titleBase}>
      <div css={styles.textWrapper}>{children}</div>
      {!!After && (
        <div css={styles.afterWrapper}>
          <After />
        </div>
      )}
    </div>
  );
};

export default withContentTheme(SectionTitle);
