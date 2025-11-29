"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { showToast } from "@/lib/global";
import { Eye, EyeOff } from "lucide-react";
import { useAuthContext } from "@/context/Auth";

const ProfilePage = () => {

    const { user, dispatch } = useAuthContext()
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [fullName, setFullName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const token = localStorage.getItem("token")

    useEffect(() => { setFullName(user.fullName); setPhotoPreview(user.photoURL || null); }, [user]);

    const handleUpdateProfile = e => {

        e.preventDefault()

        const formData = new FormData()
        formData.append("fullName", fullName)
        if (photo) formData.append("photo", photo)

        setIsUpdatingProfile(true)
        axios.patch("/api/auth/profile", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                showToast(data.message || "Profile updated", "success");
                dispatch({ type: "SET_PROFILE", payload: { user: data.user } });
            })
            .catch((err) => {
                showToast(err.response?.data?.error || "Failed to update profile", "error");
            })
            .finally(() => {
                setIsUpdatingProfile(false);
            });
    };

    const handleChangePassword = e => {

        e.preventDefault()

        const formData = new FormData()
        formData.append("currentPassword", currentPassword)
        formData.append("newPassword", newPassword)

        setIsChangingPassword(true)
        axios.put("/api/auth/profile", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                showToast(data.message || "Password changed", "success");
                setCurrentPassword("");
                setNewPassword("");
            })
            .catch((err) => {
                showToast(err.response?.data?.error || "Failed to change password", "error");
            })
            .finally(() => {
                setIsChangingPassword(false);
            });
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <Tabs defaultValue="profile" className="w-full max-w-2xl mx-auto">
                <div className="flex justify-center">
                    <TabsList className="w-auto">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="profile">
                    <form onSubmit={handleUpdateProfile}>
                        <Card className="space-y-6">
                            <CardHeader>
                                <CardTitle>Update Profile</CardTitle>
                                <CardDescription>Change your name and profile photo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col gap-4 items-center">
                                    {photoPreview ? (
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                                            <Image src={photoPreview} alt="Profile Photo" fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">Photo</div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setPhoto(e.target.files[0]);
                                            setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                                        }}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isUpdatingProfile}>
                                    {isUpdatingProfile && <Spinner size="sm" className="mr-2" />}Update Profile
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                <TabsContent value="security">
                    <form onSubmit={handleChangePassword}>
                        <Card className="space-y-3">
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Update your password</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                    </div>
                                    <div className="relative w-full">
                                        <Input type={showCurrentPassword ? "text" : "password"} placeholder="Enter your password" className="pr-10" name="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-none rounded-bl-none top-1/2 -translate-y-1/2" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="newPassword">New Password</Label>
                                    </div>
                                    <div className="relative w-full">
                                        <Input type={showNewPassword ? "text" : "password"} placeholder="Enter your password" className="pr-10" name="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        <Button type="button" variant="ghost" className="transparent absolute right-0 rounded-tl-none rounded-bl-none top-1/2 -translate-y-1/2" onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full" disabled={isChangingPassword}>{isChangingPassword && <Spinner />}Change Password</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ProfilePage;
