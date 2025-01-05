// Update the columns array
const columns = [
  // ... other columns
  { 
    header: 'Role & Date',
    accessor: (user: User) => (
      <div className="space-y-1">
        <span className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          user.role === 'admin' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {user.role}
        </span>
        <div className="text-sm text-muted-foreground">
          Joined {formatDate(user.created_at)}
        </div>
      </div>
    )
  },
  // ... rest of the columns
];