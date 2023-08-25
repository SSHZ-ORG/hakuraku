import {useState} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

type CopyButtonProps = {
    content: string,
};

export default function CopyButton(props: CopyButtonProps) {
    const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

    return <OverlayTrigger show={showCopiedTooltip} placement="bottom"
                           overlay={<Tooltip id="copied-overlay">Copied!</Tooltip>}>
            <span className="material-icons copy-button"
                  onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(props.content)
                          .then(() => {
                              setShowCopiedTooltip(true);
                              setTimeout(() => setShowCopiedTooltip(false), 800);
                          });
                  }}>
            content_copy
        </span>
    </OverlayTrigger>;
}
