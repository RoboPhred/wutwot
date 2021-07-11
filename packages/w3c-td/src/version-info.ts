/**
 * Metadata of a Thing that provides version information about the TD document. If required, additional version information such as firmware and hardware version (term definitions outside of the TD namespace) can be extended via the TD Context Extension mechanism.
 *
 * {@link https://w3c.github.io/wot-thing-description/#versioninfo}
 */
export interface VersionInfo {
  /**
   * Provides a version indicator of this TD instance.
   */
  instance: string;
}
