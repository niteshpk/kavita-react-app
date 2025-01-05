// Update the columns array
const columns = [
  // ... other columns
  { 
    header: 'Author & Date',
    accessor: (post: Post) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {/* ... author display code ... */}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(post.created_at)}
        </div>
      </div>
    )
  },
  // ... rest of the columns
];