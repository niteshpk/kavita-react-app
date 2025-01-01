import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LikesService } from '../../services/likes-service';

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  likesCount: number;
  onLikeChange: (isLiked: boolean) => void;
}

export function LikeButton({ postId, isLiked, likesCount, onLikeChange }: LikeButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLikeClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLiked) {
        await LikesService.unlikePost(postId);
      } else {
        await LikesService.likePost(postId);
      }
      onLikeChange(!isLiked);
    } catch (error) {
      console.error('Failed to update like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center space-x-1 text-sm transition-colors",
        isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
      )}
    >
      <Heart
        className={cn(
          "w-5 h-5",
          isLiked && "fill-current",
          isLoading && "animate-pulse"
        )}
      />
      <span>{likesCount}</span>
    </button>
  );
}