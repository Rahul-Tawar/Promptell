const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export function UserAvatar({size = 'md', image, name}) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-75"></div>
      <img
        src={image}
        alt={name}
        className={`relative rounded-full object-cover ${sizeClasses[size]}`}
      />
    </div>
  );
}