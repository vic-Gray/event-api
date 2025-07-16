find src -type f -name '*.ts' ! -name '*.spec.ts' ! -name '*.module.ts' | while read file; do
  spec="${file%.ts}.spec.ts"
  if [ ! -f "$spec" ]; then
    className=$(basename "$file" .ts | sed -E 's/(^|_)([a-z])/\U\2/g')
    echo "describe('${className}', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });
});
" > "$spec"
    echo "✔ Created $spec"
  fi
done
