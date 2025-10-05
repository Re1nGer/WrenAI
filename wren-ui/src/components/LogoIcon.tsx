import Image from 'next/image';

export default function LogoIcon() {
  return (
    <Image
      src="/images/logo-icon.png"
      alt="Logo icon"
      width={48}
      height={30}
      style={{ objectFit: 'contain' }}
    />
  );
}