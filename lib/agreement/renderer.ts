export function renderTemplate(
  template: string,
  data: Record<string, any>
) {
  let output = template;

  Object.entries(data).forEach(([key, value]) => {
    output = output.replaceAll(
      `{{${key}}}`,
      value?.toString() ?? ""
    );
  });

  return output;
}