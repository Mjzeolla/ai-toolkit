export interface SkillFrontmatter {
  name?: unknown;
  description?: unknown;
}

export interface OpenAiMetadata {
  interface?: {
    display_name?: unknown;
    short_description?: unknown;
    default_prompt?: unknown;
  };
  policy?: {
    allow_implicit_invocation?: unknown;
  };
}

export interface PluginManifest {
  $schema?: unknown;
  name?: unknown;
  version?: unknown;
  description?: unknown;
}

export interface ValidationResult {
  errors: string[];
  pluginCount: number;
  skillCount: number;
}
