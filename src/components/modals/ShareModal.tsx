interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId?: string;
}

export function ShareModal({ open, onOpenChange, blogId }: ShareModalProps) {
  return (
    <div>
      {/* TODO: Implement share modal */}
      <p>Share modal functionality coming soon...</p>
    </div>
  );
}