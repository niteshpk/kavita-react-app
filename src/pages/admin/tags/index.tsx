// Update the columns array
const columns = [
  { 
    header: 'Tag Details',
    accessor: (tag: Tag) => (
      <div className="space-y-1">
        <div className="font-medium">{tag.name}</div>
        <div className="text-sm text-muted-foreground">
          Created {formatDate(tag.created_at)}
        </div>
      </div>
    )
  },
  // ... rest of the columns
];