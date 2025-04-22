import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUser } from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";

const LikeBtn = ({ productId }) => {
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch wishlist status on mount
    useEffect(() => {
        const fetchWishlistStatus = async () => {
            if (!user || !user._id) {
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/user/${user._id}/account/wishlists`,
                    { withCredentials: true }
                );

                const wishlist = res.data?.data?.wishlists || [];
                setIsLiked(wishlist.some(p => p._id === productId));
            } catch (error) {
                console.error("Error checking wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistStatus();
    }, [user, productId]);

    // Toggle wishlist (add/remove)
    const toggleWishlist = async () => {
        if (!user || !user._id) {
            navigate("/user/login");
            return;
        }

        // Optimistic UI update
        setIsLiked(prev => !prev);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/${user._id}/account/wishlist`,
                { productId },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            setIsLiked(prev => !prev); // Revert on failure
        }
    };

    if (loading) return <FaRegHeart className="w-6 h-6 text-white animate-pulse" />;

    return (
        <button
            onClick={toggleWishlist}
            className="cursor-pointer hover:scale-110 transition-all duration-150"
            title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            {isLiked ? (
                <FaHeart className="text-red-600 w-6 h-6" />
            ) : (
                <FaRegHeart className="text-white w-6 h-6" />
            )}
        </button>
    );
};

export default LikeBtn;
