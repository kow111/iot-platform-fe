const TabMember = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-500">
        This project is private. Only members can view it.
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-500">Members</div>
        <div className="flex items-center gap-2">
          <img
            src="/images/user.png"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm text-gray-800">John Doe</div>
        </div>
      </div>
    </div>
  );
};

export default TabMember;
