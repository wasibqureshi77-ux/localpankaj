import UsersManagementTable from "@/components/UsersManagementTable";

export default function WebsiteUsersPage() {
  return (
    <UsersManagementTable 
      title="Website Users." 
      subtitle="Public Customer Intelligence and Activity Registry." 
      roleFilter="USER"
    />
  );
}

