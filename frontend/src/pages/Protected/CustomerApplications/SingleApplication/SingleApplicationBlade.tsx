import {
    ApiOutlined,
    CheckOutlined,
    CloseOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    LaptopOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Card, Tag, notification, Table, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { CustomerAction } from "../../../../actions/CustomerAction";
import { RouteAction } from "../../../../actions/RouteAction";
import { TenantAction } from "../../../../actions/TenantAction";
import {
    SINGLE_APPLICATION_DETAILS_ROUTE,
    SINGLE_APPLICATION_PHOTOS_ROUTE,
    SINGLE_APPLICATION_DOCUMENTS_ROUTE,
} from "../../../../constants/appRoutes";
import AppContent from "../../../../containers/AppContent/AppContent";
import MainOptionsLayout from "../../../../layouts/MainLayout/MainOptionsLayout";
import { ICustomerApplication } from "../../../../models/Customer/Customer";
import { IDevice } from "../../../../models/Device/Device";
import { ITenant, ITenantDetails } from "../../../../models/Tenant/Tenant";
import { RootState } from "../../../../redux/reducers";
import Styles from "../CustomerApplications.scss";
import ApplicationStatusActions from "./ApplicationStatusActions";

const CustomerDetailsView: React.FC<{ applicationId: string }> = ({ applicationId }) => {
    const application = useSelector<RootState, ICustomerApplication | undefined>((r) => r.customer.applications.find((t) => t._id === applicationId));

    return (
        <AppContent header="Personal Details" headerActions={application ? <ApplicationStatusActions application={application} /> : null}>
            <Card>
                {application && (
                    <Table
                        dataSource={[
                            { label: "First Name", value: application.firstName },
                            { label: "Last Name", value: application.lastName },
                            { label: "Email", value: application.email },
                            { label: "Address", value: application.address },
                            { label: "Telephone", value: application.telephone || "N/A" },
                            { label: "Date of birth", value: application.dateOfBirth || "N/A" },
                        ]}
                        showHeader={false}
                        pagination={false}
                        columns={[
                            { title: "", dataIndex: "label", width: 250 },
                            { title: "", dataIndex: "value" },
                        ]}
                    />
                )}
            </Card>
        </AppContent>
    );
};

const CustomerPhotosView: React.FC<{ applicationId: string }> = ({ applicationId }) => {
    const application = useSelector<RootState, ICustomerApplication | undefined>((r) => r.customer.applications.find((t) => t._id === applicationId));
    const [profilePhotoSrc, setProfilePhotoSrc] = useState<string>();
    const [licencePhotoSrc, setLicencePhotoSrc] = useState<string>();
    const [loadingProfilePhoto, setLoadingProfilePhoto] = useState(false);
    const [loadingLicencePhoto, setLoadingLicencePhoto] = useState(false);
    const loadProfilePhoto = async () => {
        try {
            setLoadingProfilePhoto(true);
            await CustomerAction.loadApplicationData("profilePhoto", application!._id, application!.profilePhoto!.blobName);
        } catch (error) {
            notification.error({ message: "Failed to load profile photo", description: `${error}` });
        } finally {
            setLoadingProfilePhoto(false);
        }
    };

    const loadLicencePhoto = async () => {
        try {
            setLoadingLicencePhoto(true);
            await CustomerAction.loadApplicationData("licencePhoto", application!._id, application!.licencePhoto!.blobName);
        } catch (error) {
            notification.error({ message: "Failed to load licence photo", description: `${error}` });
        } finally {
            setLoadingLicencePhoto(false);
        }
    };

    useEffect(() => {
        if (application && !application.profilePhoto?.data) loadProfilePhoto();
        if (application && !application.licencePhoto?.data) loadLicencePhoto();
    }, [application]);

    useEffect(() => {
        let uri1 = "";
        let uri2 = "";
        if (application?.profilePhoto?.data) {
            uri1 = URL.createObjectURL(application.profilePhoto.data);
            setProfilePhotoSrc(uri1);
        }
        if (application?.licencePhoto?.data) {
            uri2 = URL.createObjectURL(application.licencePhoto.data);
            setLicencePhotoSrc(uri2);
        }
        return () => {
            if (uri1) URL.revokeObjectURL(uri1);
            if (uri2) URL.revokeObjectURL(uri2);
        };
    }, [application?.profilePhoto]);

    return (
        <>
            <AppContent header="Profile & Licence Photo" headerActions={application ? <ApplicationStatusActions application={application} /> : null}>
                <div className={Styles.PhotoViewContainer}>
                    <Card className={Styles.PhotoCard}>
                        <div className={Styles.Title}>Profile Photo</div>
                        {profilePhotoSrc ? (
                            <img className={Styles.Photo} src={profilePhotoSrc} alt="Unable to display photo" />
                        ) : loadingProfilePhoto ? (
                            <Spin tip="Loading..." />
                        ) : (
                            "Load failed!"
                        )}
                    </Card>
                    <Card className={Styles.PhotoCard}>
                        <div className={Styles.Title}>Licence Photo</div>
                        {licencePhotoSrc ? (
                            <img className={Styles.Photo} src={licencePhotoSrc} alt="Unable to display photo" />
                        ) : loadingLicencePhoto ? (
                            <Spin tip="Loading..." />
                        ) : (
                            "Load failed!"
                        )}
                    </Card>
                </div>
            </AppContent>
        </>
    );
};

const CustomerDocumentsView: React.FC<{ applicationId: string }> = ({ applicationId }) => {
    const application = useSelector<RootState, ICustomerApplication | undefined>((r) => r.customer.applications.find((t) => t._id === applicationId));
    const [legalAgreementSrc, setLegalAgreement] = useState<string>();
    const [loading, setLoading] = useState(false);

    const loadLegalAgreement = async () => {
        try {
            setLoading(true);
            await CustomerAction.loadApplicationData("legalAgreement", application!._id, application!.legalAgreement!.blobName);
        } catch (error) {
            notification.error({ message: "Failed to load legal agreement", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (application && !application.legalAgreement?.data) loadLegalAgreement();
    }, [application]);

    useEffect(() => {
        let uri = "";
        if (application?.legalAgreement?.data) {
            uri = URL.createObjectURL(new File([application.legalAgreement.data], "asdf", { type: "application/pdf" }));
            setLegalAgreement(uri);
        }
        return () => {
            if (uri) URL.revokeObjectURL(uri);
        };
    }, [application?.profilePhoto]);

    useEffect(() => {
        console.log("LEGAL AGREEMENT ", legalAgreementSrc);
    }, [legalAgreementSrc]);

    return (
        <>
            <AppContent header="Legal Agreement" headerActions={application ? <ApplicationStatusActions application={application} /> : null}>
                <Card>
                    {legalAgreementSrc ? (
                        <embed style={{ width: "100%", maxWidth: 1000, height: 1300 }} src={legalAgreementSrc} type="application/pdf" />
                    ) : loading ? (
                        <Spin tip="Loading..." />
                    ) : (
                        "Load failed"
                    )}
                </Card>
            </AppContent>
        </>
    );
};

export const SingleApplicationBlade = () => {
    const match = useRouteMatch();
    const applicationId = (match.params as any).applicationId;
    const application = useSelector<RootState, ICustomerApplication | undefined>((r) => r.customer.applications.find((t) => t._id === applicationId));
    const [loading, setLoading] = useState(false);
    const handleLoadTenant = async () => {
        try {
            setLoading(true);
            // TenantAction.loadTenantDetails(tenantId);
        } catch (error) {
            notification.error({ message: "Failed to load tenant", description: `${error}` });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadTenant();
    }, []);

    const handleGoBack = () => RouteAction.gotoAllTenants();

    return (
        <MainOptionsLayout
            sidebarProps={{
                header: (
                    <span>
                        {application?.firstName} {application?.lastName}
                        <div style={{ marginLeft: 30, fontSize: 11, color: "#bbb", position: "relative", top: -2 }}>Customer application</div>
                    </span>
                ),
                onBack: handleGoBack,
                menuItems: [
                    {
                        label: "Personal Details",
                        route: RouteAction.getSingleApplicationDetailsRoute(applicationId),
                        key: "personal_details",
                        icon: <DashboardOutlined />,
                    },
                    {
                        label: "Photos",
                        icon: <FileImageOutlined />,
                        route: RouteAction.getSingleApplicationPhotosRoute(applicationId),
                        key: "photos",
                    },
                    {
                        label: "Legal Agreement",
                        icon: <FilePdfOutlined />,
                        route: RouteAction.getSingleApplicationDocsRoute(applicationId),
                        key: "legal_agreement",
                    },
                ],
            }}
        >
            <Switch>
                <Route path={SINGLE_APPLICATION_DETAILS_ROUTE} component={() => <CustomerDetailsView applicationId={applicationId} />} />
                <Route path={SINGLE_APPLICATION_PHOTOS_ROUTE} component={() => <CustomerPhotosView applicationId={applicationId} />} />
                <Route path={SINGLE_APPLICATION_DOCUMENTS_ROUTE} component={() => <CustomerDocumentsView applicationId={applicationId} />} />
                <Redirect to={SINGLE_APPLICATION_DETAILS_ROUTE} push />
            </Switch>
        </MainOptionsLayout>
    );
};
