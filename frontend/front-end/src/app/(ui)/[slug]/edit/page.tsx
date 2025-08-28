import { Button } from "@/components/ui/button";
import { GeneralHeader } from "@/components/ui/general-header";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { user } from "@/data/user";
import { faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
    return (
        <div>
            <GeneralHeader backHref="/">
                <div className="font-bold text-lg">Edit Profile</div>
            </GeneralHeader>
            <section className="border-b-2 border-gray-900">
                <div className="flex justify-center items-center gap-4 bg-gray-500 h-28 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url(' + user.cover + ')' }}>
                    <div className="cursor-pointer bg-black/70 flex justify-center items-center size-12 rounded-full">
                        <FontAwesomeIcon icon={faCamera} className="text-xl"/>
                    </div>
                    <div className="cursor-pointer bg-black/70 flex justify-center items-center size-12 rounded-full">
                        <FontAwesomeIcon icon={faXmark} className="text-xl"/>
                    </div>
                </div>
                <div className="-mt-12 px-6">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-24 rounded-full"
                    />
                    <div className="size-24 flex justify-center items-center -mt-24">
                        <div className="cursor-pointer bg-black/70 flex justify-center items-center size-12 rounded-full">
                            <FontAwesomeIcon icon={faCamera} className="text-xl"/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="p-6 flex flex-col gap-4">
                <label>
                    <p className="text-lg text-gray mb-2">Name</p>
                    <Input
                        placeholder="Enter your name"
                        value={user.name}
                    />
                </label>
                <label>
                    <p className="text-lg text-gray mb-2">Bio</p>
                    <TextArea
                        placeholder="Describe yourself"
                        rows={4}
                        value={user.bio}
                    />
                </label>
                <label>
                    <p className="text-lg text-gray mb-2">Link</p>
                    <Input
                        placeholder="Enter a link"
                        value={user.link}
                    />
                </label>

                <Button
                    label="Save Changes"
                    size={1}
                />
            </section>
        </div>
    )
}