export const getContactEmail = () => ['info', 'amephia.com'].join('@');

export const openEmailClient = (subject?: string) => {
    const email = getContactEmail();
    const url = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
    window.location.href = url;
};
