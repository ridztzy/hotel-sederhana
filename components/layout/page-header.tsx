// app/components/layout/page-header.tsx
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode; // Bisa menerima komponen lain, seperti Button
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
