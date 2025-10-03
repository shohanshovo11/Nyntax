import UserProfile from "/user.png";

export default function Label({ name }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <div className="w-6 h-6">
        <img className="w-full" src={UserProfile} />
      </div>
      <label className="font-bold text-xl">{name}</label>
    </div>
  );
}
