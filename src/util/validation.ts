export function isNotBlank(value: string | undefined): boolean {
    return (value || '').trim().length > 0;
}