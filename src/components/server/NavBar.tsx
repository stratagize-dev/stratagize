import SignOutButton from '@/components/client/SignOutButton';

export default function NavBar() {
  return (
    <div className="flex justify-between pt-5 pb-2 px-5 border-b">
      <div className="text-orange-500 font-semibold py-2 px-4">
        Strava Goals
      </div>
      <div className="bg-amber-500 w-max"></div>

      <SignOutButton />
    </div>
  );
}
