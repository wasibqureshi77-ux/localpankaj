import UsersManagementTable from "@/components/UsersManagementTable";

export default function ManagementUsersPage() {
  return (
    <UsersManagementTable 
      title="Management Access." 
      subtitle="Staff Authority Matrix and Command Access Registry." 
      roleFilter="STAFF"
    />
  );
}

